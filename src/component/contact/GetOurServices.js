import React,{useContext,useEffect} from 'react';
import api from '../axios/api';
import {GeneralContext} from '../../context/GeneralContextProvider';
import ScaleIcon from '@mui/icons-material/Scale';
import WebhookIcon from '@mui/icons-material/Webhook';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import StorageIcon from '@mui/icons-material/Storage';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DnsIcon from '@mui/icons-material/Dns';

import ArchitectureIcon from '@mui/icons-material/Architecture';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PaidIcon from '@mui/icons-material/Paid';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupIcon from '@mui/icons-material/Group';

const GetOurServices = () => {
const {serverUrl,staticImage,setGetServiceArray,setLoaded,setMainService,setAllServiceArray}=useContext(GeneralContext);

const iconArray=[{id:0,icon:<ScaleIcon />},{id:1,icon:<WebhookIcon />},{id:2,icon:<StorageIcon />},{id:3,icon:<CloudSyncIcon />},{id:4,icon:<PrecisionManufacturingIcon />},{id:5,icon:<DnsIcon />},{id:6,icon:<DnsIcon />},
{id:7,icon:<ScaleIcon />},{id:8,icon:<WebhookIcon />},{id:9,icon:<StorageIcon />}
]

const iconAllServiceArr=[{id:1,icon:<DesignServicesIcon />},{id:2,icon:<ManageHistoryIcon />},{id:3,icon:<ProductionQuantityLimitsIcon />},{id:4,icon:<PaidIcon />},{id:5,icon:<ScreenSearchDesktopIcon />},{id:6,icon:<PeopleAltIcon />},{id:7,icon:<GroupIcon />},]

useEffect(()=>{
    const getOurServices= async ()=>{
        try {
          const res = await api.get();
          const data= await res.data;
          // Adding icon to data array
          setMainService(data.filter(obj=>(obj.id===1))[0])
          let allServicedata=data.filter(obj=>(obj.category===3))
          allServiceArrayFunc(allServicedata);
          const combinedMainServiceArrayIcon =(arrIcon)=>{
            let mainServiceArr=data.filter(obj=>(obj.category ===2))
          for(let i=0;i<mainServiceArr.length;i++){
              let iconObj=arrIcon.filter(obj=>(obj.id===i))[0];
              if(iconObj){
                mainServiceArr[i]={...mainServiceArr[i],"icon":iconObj.icon}
              }
           
          }
          return setGetServiceArray(mainServiceArr)
          }
          combinedMainServiceArrayIcon(iconArray)

          // END Adding icon to data array
          setLoaded(true);
        } catch (error) {
          console.error(error.message)
        }
    }
    getOurServices();
  },[])

  const allServiceArrayFunc=(arrCat3)=>{
    let newArray=arrCat3;
    for(let i=0;i<newArray.length;i++){
      let iconObj=iconAllServiceArr[i];
        newArray[i]={...newArray[i],"icon":iconObj.icon}
  }
  return setAllServiceArray(newArray)
  }
}

export default GetOurServices