import React from "react";
import { GeneralContext } from "../../context/GeneralContextProvider";
import styles from "./video.module.css";
import styled from "styled-components";

const CustCover = styled.div`
  margin: 0 auto;
  width: 100vw;
  position: relative;
  background-image: url(${({ bgimage }) => bgimage});
  background-size: 100% 200%;
  background-position: 100% 100%;
  height: 100vh;
  display: flex;
  filter:saturate(2);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: ${({loaded})=>loaded ? "climbdown":""} 7s ease-in-out;
  @keyframes climbdown {
    from {opacity:0;background-position: 100% 0%;filter:saturate(0.8);}
    to {opacity:1;background-position: 100% 100%;filter:saturate(2);}
  }
  @media screen and (max-width:900px){
    min-height:100vh;
    padding:1rem;
    background-size:300% 200%;
    background-position: 40% 100%;
    @keyframes climbdown {
      from {opacity:0;background-position: 40% 0%;filter:saturate(0.8);}
      to {opacity:1;background-position: 40% 100%;filter:saturate(2);}
    }
  }
  }
  @media screen and (max-width:600px){
    padding:1rem;
    background-size:400% 200%;
    background-position: 40% 100%;
    @keyframes climbdown {
      from {opacity:0;background-position: 40% 0%;filter:saturate(0.8);}
      to {opacity:1;background-position: 40% 100%;filter:saturate(2);}
    }
  }
`;

const CoverPage = ({ getWidth }) => {
  const { staticImage } = React.useContext(GeneralContext);
  const [loaded,setLoaded]=React.useState(false);
  const videoPic = `${staticImage}/video.png`;
  const greenEffect = `${staticImage}/extra/greenEffect.png`;

  React.useEffect(()=>{
    if(videoPic){
      setLoaded(true);
    }
  },[videoPic]);

  return (
    <CustCover bgimage={videoPic} loaded={loaded} className={styles.custcover}>
      <section sx={{ alignItems: "center" }} className={styles.titleBlock}>
        <p
          className={styles.fontTitle}
          style={{ backgroundImage: `url(${greenEffect})` }}
        >
          Our Videos
        </p>
        <section>
          <div>
          <p
          className={styles.fontSubTitle}
          style={{ backgroundImage: `url(${greenEffect})` }}
        >
          Video to toggle creativity
        </p>
          </div>
          <small>demos only, for display purposes</small>
        </section>
      </section>
    </CustCover>
  );
};

export default CoverPage;
