# Installing Custom Android on a Galaxy S3 Mini

Searching how to do this on the Internet returned a ton of videos of mostly
young people explaining how to press the special button combinations then
connect it to a PC and run some Windows program which should hopefully install
TWRP or CMR which should hopefully allow you to root the phone but not brick
it, thus allowing you to install a new ROM.

This all seemed a bit ghetto for my liking and I don't have a Windows machine
anyway. And without trying a special combination I gave up, frustrated, and
moved onto something else.

Later, still frustrated with my stock Android and its carrier and Google
lock-in I decided to look into this again, this time more determined to work
out what these acroynms meant and somehow install a new Android using a machine
running Linux. 

I was hoping installing a new Android would be just a matter of using the `dd`
command to image a partition with a new Android image. It turns out it is just
a matter of imaging partitions, but Samsung use a custom protocol called Odin,
which is used to get partition information from the device write images to
partitions. Apparently this is an unoffical Samsung client that was leaked,  



http://glassechidna.com.au/heimdall/

