// UHC.MutVar
var $UHC=
 ($UHC ? $UHC : {});
$UHC.$MutVar=
 ($UHC.$MutVar ? $UHC.$MutVar : {});
$UHC.$MutVar.$newMutVar=
 new _F_(function($__,$__2)
         {var $__3=
           _e_($__);
          var $__4=
           _e_($__2);
          return primNewMutVar($__3,$__4);});
$UHC.$MutVar.$readMutVar=
 new _F_(function($__,$__2)
         {var $__3=
           _e_($__);
          var $__4=
           _e_($__2);
          return primReadMutVar($__3,$__4);});
$UHC.$MutVar.$sameMutVar=
 new _F_(function($__,$__2)
         {var $__3=
           _e_($__);
          var $__4=
           _e_($__2);
          return primSameMutVar($__3,$__4);});
$UHC.$MutVar.$writeMutVar=
 new _F_(function($__,$__2,$__3)
         {var $__4=
           _e_($__);
          var $__5=
           _e_($__2);
          var $__6=
           _e_($__3);
          return primWriteMutVar($__4,$__5,$__6);});
$UHC.$MutVar.$s2NEW15UNQ63=
 new _F_(function($__)
         {var $__2=
           _e_($__);
          return $__2[0];});
$UHC.$MutVar.$vNEW18UNQ64=
 new _F_(function($__)
         {var $__2=
           _e_($__);
          return $__2[1];});
$UHC.$MutVar.$__117__467__0NEW21UNQ65=
 new _F_(function($f,$s2,$v)
         {var $__=
           _e_($s2);
          return new _A_($f,[$v]);});
$UHC.$MutVar.$vnewNEW26UNQ66=
 new _F_(function($__)
         {var $__2=
           _e_($__);
          return $__2[0];});
$UHC.$MutVar.$vresNEW30UNQ67=
 new _F_(function($__)
         {var $__2=
           _e_($__);
          return $__2[1];});
$UHC.$MutVar.$atomicModifyMutVar=
 new _F_(function($mv,$f,$s1)
         {var $__=
           new _A_($UHC.$MutVar.$readMutVar,[$mv,$s1]);
          var $s2=
           new _A_($UHC.$MutVar.$s2NEW15UNQ63,[$__]);
          var $v=
           new _A_($UHC.$MutVar.$vNEW18UNQ64,[$__]);
          var $__7=
           new _A_($UHC.$MutVar.$__117__467__0NEW21UNQ65,[$f,$s2,$v]);
          var $vnew=
           new _A_($UHC.$MutVar.$vnewNEW26UNQ66,[$__7]);
          var $s3=
           new _A_($UHC.$MutVar.$writeMutVar,[$mv,$vnew,$s2]);
          var $vres=
           new _A_($UHC.$MutVar.$vresNEW30UNQ67,[$__7]);
          var $__11=
           _e_($s3);
          return [$s3,$vres];});
$UHC.$MutVar.$__Rep1MutVarDFLUHC_2eBase_2eto1GENRepresentable1=
 new _F_(function($proj__1)
         {return $UHC.$Base.$undefined;});
$UHC.$MutVar.$__Rep1MutVarDFLUHC_2eBase_2efrom1GENRepresentable1=
 new _F_(function($x)
         {return $UHC.$Base.$undefined;});
$UHC.$MutVar.$__Rep1MutVarNEW37UNQ36SDCGENRepresentable1=
 new _F_(function($__)
         {var $__2=
           new _A_($UHC.$MutVar.$__Rep1MutVarNEW39UNQ37EVLSDCGENRepresentable1,[$__]);
          return $__2;});
$UHC.$MutVar.$__Rep1MutVarNEW39UNQ37EVLSDCGENRepresentable1=
 new _F_(function($__)
         {var $Representable1__=
           _e_(new _A_($UHC.$Base.$Representable1__CLS73__372__0,[$__]));
          var $__5=
           {_tag_:0,_1:$UHC.$MutVar.$__Rep1MutVarDFLUHC_2eBase_2efrom1GENRepresentable1,_2:$UHC.$MutVar.$__Rep1MutVarDFLUHC_2eBase_2eto1GENRepresentable1};
          return $__5;});
$UHC.$MutVar.$__Rep1MutVarUNQ36SDCGENRepresentable1=
 new _A_(new _F_(function()
                 {return new _A_($UHC.$MutVar.$__Rep1MutVarNEW37UNQ36SDCGENRepresentable1,[$UHC.$MutVar.$__Rep1MutVarUNQ36SDCGENRepresentable1]);}),[]);
$UHC.$MutVar.$__Rep1MutVarGENRepresentable1=
 new _A_(new _F_(function()
                 {return $UHC.$MutVar.$__Rep1MutVarUNQ36SDCGENRepresentable1;}),[]);
$UHC.$MutVar.$__Rep0MutVarDFLUHC_2eBase_2eto0GENRepresentable0=
 new _F_(function($proj__1)
         {return $UHC.$Base.$undefined;});
$UHC.$MutVar.$__Rep0MutVarDFLUHC_2eBase_2efrom0GENRepresentable0=
 new _F_(function($x)
         {return $UHC.$Base.$undefined;});
$UHC.$MutVar.$__Rep0MutVarNEW46UNQ27SDCGENRepresentable0=
 new _F_(function($__)
         {var $__2=
           new _A_($UHC.$MutVar.$__Rep0MutVarNEW48UNQ28EVLSDCGENRepresentable0,[$__]);
          return $__2;});
$UHC.$MutVar.$__Rep0MutVarNEW48UNQ28EVLSDCGENRepresentable0=
 new _F_(function($__)
         {var $Representable0__=
           _e_(new _A_($UHC.$Base.$Representable0__CLS73__371__0,[$__]));
          var $__5=
           {_tag_:0,_1:$UHC.$MutVar.$__Rep0MutVarDFLUHC_2eBase_2efrom0GENRepresentable0,_2:$UHC.$MutVar.$__Rep0MutVarDFLUHC_2eBase_2eto0GENRepresentable0};
          return $__5;});
$UHC.$MutVar.$__Rep0MutVarUNQ27SDCGENRepresentable0=
 new _A_(new _F_(function()
                 {return new _A_($UHC.$MutVar.$__Rep0MutVarNEW46UNQ27SDCGENRepresentable0,[$UHC.$MutVar.$__Rep0MutVarUNQ27SDCGENRepresentable0]);}),[]);
$UHC.$MutVar.$__Rep0MutVarGENRepresentable0=
 new _A_(new _F_(function()
                 {return $UHC.$MutVar.$__Rep0MutVarUNQ27SDCGENRepresentable0;}),[]);
$UHC.$MutVar.$_24D__MutVarDFLUHC_2eBase_2emoduleNameGENDatatype=
 new _F_(function($x)
         {return new _A_($UHC.$Base.$packedStringToString,["UHC.MutVar"]);});
$UHC.$MutVar.$_24D__MutVarDFLUHC_2eBase_2edatatypeNameGENDatatype=
 new _F_(function($x)
         {return new _A_($UHC.$Base.$packedStringToString,["MutVar"]);});
$UHC.$MutVar.$_24D__MutVarNEW55UNQ45SDCGENDatatype=
 new _F_(function($_24D__MutVar)
         {var $_24D__MutVar2=
           new _A_($UHC.$MutVar.$_24D__MutVarNEW57UNQ46EVLSDCGENDatatype,[$_24D__MutVar]);
          return $_24D__MutVar2;});
$UHC.$MutVar.$_24D__MutVarNEW57UNQ46EVLSDCGENDatatype=
 new _F_(function($_24D__MutVar)
         {var $Datatype__=
           _e_(new _A_($UHC.$Base.$Datatype__CLS73__352__0,[$_24D__MutVar]));
          var $__5=
           {_tag_:0,_1:$UHC.$MutVar.$_24D__MutVarDFLUHC_2eBase_2edatatypeNameGENDatatype,_2:$UHC.$MutVar.$_24D__MutVarDFLUHC_2eBase_2emoduleNameGENDatatype};
          return $__5;});
$UHC.$MutVar.$_24D__MutVarUNQ45SDCGENDatatype=
 new _A_(new _F_(function()
                 {return new _A_($UHC.$MutVar.$_24D__MutVarNEW55UNQ45SDCGENDatatype,[$UHC.$MutVar.$_24D__MutVarUNQ45SDCGENDatatype]);}),[]);
$UHC.$MutVar.$_24D__MutVarGENDatatype=
 new _A_(new _F_(function()
                 {return $UHC.$MutVar.$_24D__MutVarUNQ45SDCGENDatatype;}),[]);
