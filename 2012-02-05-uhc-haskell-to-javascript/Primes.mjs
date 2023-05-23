// Primes
var $Primes=
 ($Primes ? $Primes : {});
$Primes.$__12__229__2__0=
 new _A_(new _F_(function()
                 {return new _A_($UHC.$Base.$Eq__DCT73__396__0,[$UHC.$Base.$Eq__DCT73__88__0]);}),[]);
$Primes.$_24okUNQ15=
 new _F_(function($n,$_24x)
         {var $__=
           new _A_($UHC.$Base.$mod,[$UHC.$Base.$Integral__DCT73__110__0,$n,$_24x]);
          var $__4=
           new _A_($UHC.$Base.$_3d_3d,[$UHC.$Base.$Eq__DCT73__88__0,$__,0]);
          var $__5=
           _e_($__4);
          var $__swJSW0__0;
          switch($__5._tag_)
           {case 0:
             $__swJSW0__0=
              $UHC.$Base.$_5b_5d;
             break;
            case 1:
             var $__6=
              new _A_($UHC.$Base.$_3a,[$_24x,$UHC.$Base.$_5b_5d]);
             $__swJSW0__0=
              $__6;
             break;}
          return $__swJSW0__0;});
$Primes.$factors=
 new _F_(function($n)
         {var $__=
           new _A_($UHC.$Base.$enumFromTo,[$UHC.$Base.$Enum__DCT73__118__0,1,$n]);
          var $__3=
           new _A_($Primes.$_24okUNQ15,[$n]);
          return new _A_($UHC.$Base.$concatMap,[$__3,$__]);});
$Primes.$prime=
 new _F_(function($n)
         {var $__=
           new _A_($UHC.$Base.$_3a,[$n,$UHC.$Base.$_5b_5d]);
          var $__3=
           new _A_($UHC.$Base.$_3a,[1,$__]);
          var $__4=
           new _A_($Primes.$factors,[$n]);
          return new _A_($UHC.$Base.$_3d_3d,[$Primes.$__12__229__2__0,$__4,$__3]);});
$Primes.$_24okUNQ23=
 new _F_(function($_24x)
         {var $__=
           new _A_($Primes.$prime,[$_24x]);
          var $__3=
           _e_($__);
          var $__swJSW1__0;
          switch($__3._tag_)
           {case 0:
             $__swJSW1__0=
              $UHC.$Base.$_5b_5d;
             break;
            case 1:
             var $__4=
              new _A_($UHC.$Base.$_3a,[$_24x,$UHC.$Base.$_5b_5d]);
             $__swJSW1__0=
              $__4;
             break;}
          return $__swJSW1__0;});
$Primes.$primes=
 new _F_(function($n)
         {var $__=
           new _A_($UHC.$Base.$enumFromTo,[$UHC.$Base.$Enum__DCT73__118__0,2,$n]);
          return new _A_($UHC.$Base.$concatMap,[$Primes.$_24okUNQ23,$__]);});
