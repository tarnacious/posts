#!/bin/bash

# Configs overwritable via environment variables
VSYSTEM=${VSYSTEM:=qemu}                                        # Either 'qemu' or 'kvm'
FLAVOUR=${FLAVOUR:=debian}                                      # Either 'debian' or 'ubuntu'
INCLUDES=${INCLUDES:="less,vim,sudo,openssh-server,acpid,dbus"}
MIRROR=${MIRROR:="http://ftp.hu.debian.org/debian"}
ARCH=${ARCH:=amd64}
APT_CACHER=${APT_CACHER:=no}
IMGSIZE=${IMGSIZE:=80G}

clean_debian() {
        echo "Cleaning up.."
        [ "$MNT_DIR" != "" ] && chroot $MNT_DIR umount /proc/ /sys/ /dev/ /boot/
        sleep 1s
        [ "$MNT_DIR" != "" ] && umount $MNT_DIR
        sleep 1s
        [ "$DISK" != "" ] && $VSYSTEM-nbd -d $DISK
        sleep 1s
        [ "$MNT_DIR" != "" ] && rm -r $MNT_DIR
}

fail() {
        clean_debian
        echo ""
        echo "FAILED: $1"
        exit 1
}

cancel() {
        fail "CTRL-C detected"
}

if [ $# -lt 3 ]
then
        echo "author: Kamil Trzcinski (http://ayufan.eu)"
        echo "license: GPL"
        echo "usage: $0 <image-file> <hostname>" 1>&2
        exit 1
fi

FILE=$1
HOSTNAME=$2
RELEASE=$3
shift 3

trap cancel INT

echo "Installing $RELEASE into $FILE..."

MNT_DIR=`tempfile`
rm $MNT_DIR
mkdir $MNT_DIR
DISK=

# add apt cacher for faster rebuilds, runs on 3142
if [ "$APT_CACHER" == "yes" ]; then
    echo "Installing apt-cacher-ng for fast rebuilds"
    apt-get install apt-cacher-ng
fi

if [ ! -f $FILE ]; then
    echo "Creating $FILE"
    $VSYSTEM-img create -f qcow2 $FILE $IMGSIZE
fi

if [ $FLAVOUR == "debian" ]; then
    BOOT_PKG="linux-image-$ARCH grub2"
elif [ $FLAVOUR == "ubuntu" ]; then
    BOOT_PKG="linux-image-generic grub-pc"
fi

echo "Looking for nbd device..."

modprobe nbd max_part=16 || fail "failed to load nbd module into kernel"

for i in /dev/nbd*
do
        if $VSYSTEM-nbd -c $i $FILE
        then
                DISK=$i
                break
        fi
done

[ "$DISK" == "" ] && fail "no nbd device available"

echo "Connected $FILE to $DISK"

echo "Partitioning $DISK..."
sfdisk $DISK << EOF || fail "cannot partition $FILE"
,200MiB,83,*
;
EOF

echo "Creating boot partition..."
mkfs.ext4 -q ${DISK}p1 || fail "cannot create /boot ext4"

echo "Creating root partition..."
mkfs.ext4 -q ${DISK}p2 || fail "cannot create / ext4"

echo "Mounting root partition..."
mount ${DISK}p2 $MNT_DIR || fail "cannot mount /"

echo "Installing Debian..."
debootstrap --include=$INCLUDES $* stable $MNT_DIR || fail "cannot install $RELEASE into $DISK"

echo "Configuring system..."
cat <<EOF > $MNT_DIR/etc/fstab
/dev/vda1 /boot               ext4    sync 0       2
/dev/vda2 /                   ext4    errors=remount-ro 0       1
EOF

echo $HOSTNAME > $MNT_DIR/etc/hostname

cat <<EOF > $MNT_DIR/etc/hosts
127.0.0.1       localhost
127.0.1.1               $HOSTNAME

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
EOF

cat <<EOF > $MNT_DIR/etc/network/interfaces
source /etc/network/interfaces.d/*

auto lo
iface lo inet loopback

allow-hotplug ens2
iface ens2 inet dhcp
EOF

mount --bind /dev/ $MNT_DIR/dev || fail "cannot bind /dev"
chroot $MNT_DIR mount -t ext4 ${DISK}p1 /boot || fail "cannot mount /boot"
chroot $MNT_DIR mount -t proc none /proc || fail "cannot mount /proc"
chroot $MNT_DIR mount -t sysfs none /sys || fail "cannot mount /sys"
LANG=C DEBIAN_FRONTEND=noninteractive chroot $MNT_DIR apt-get install -y --force-yes -q $BOOT_PKG || fail "cannot install $BOOT_PKG"
chroot $MNT_DIR grub-install $DISK || fail "cannot install grub"

cat <<EOF > $MNT_DIR/etc/default/grub
GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="console=ttyS0"
GRUB_CMDLINE_LINUX=""
GRUB_TERMINAL=console
EOF

chroot $MNT_DIR update-grub || fail "cannot update grub"
chroot $MNT_DIR apt-get clean || fail "unable to clean apt cache"

sed -i "s|${DISK}p1|/dev/vda1|g" $MNT_DIR/boot/grub/grub.cfg
sed -i "s|${DISK}p2|/dev/vda2|g" $MNT_DIR/boot/grub/grub.cfg

echo "Enter root password:"
while ! chroot $MNT_DIR passwd root
do
        echo "Try again"
done

echo "Finishing grub installation..."
grub-install $DISK --root-directory=$MNT_DIR --modules="biosdisk part_msdos" || fail "cannot reinstall grub"

echo "SUCCESS!"
clean_debian

echo "Copy file to images dir"
cp $FILE /var/kvm/images/$FILE.qcow2

echo "Start guest"
virt-install \
        --name $FILE \
        --ram 4096 \
        --disk path=/var/kvm/images/$FILE.qcow2 \
        --vcpus 2 \
        --os-type linux \
        --os-variant debian9 \
        --network bridge=virbr0 \
        --graphics none \
        --console pty,target_type=serial \
        --noautoconsole \
        --import

echo "Bye"

exit 0

