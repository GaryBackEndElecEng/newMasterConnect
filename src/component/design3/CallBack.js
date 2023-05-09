import React, { useCallback } from 'react';
import { GeneralContext } from "../../context/GeneralContextProvider";


function ArrowClick({e,index}) {
    const {select, setSelect } = React.useContext(GeneralContext);

  const handleClickBack = useCallback(() => {
    if(index >0){

    }
  }, []);

//   return <MyChild onClick={handleClickBack} />;
}