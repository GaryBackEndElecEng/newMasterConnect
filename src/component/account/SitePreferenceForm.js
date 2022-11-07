import React, { useContext,  useState, useMemo } from 'react'
// import { GeneralContext } from '../../context/GeneralContextProvider';
import { TokenAccessContext } from '../../context/TokenAccessProvider';
import { useTheme } from '@mui/material/styles';
import {  Container,  Fab, Card,  FormLabel, FormControl, InputLabel, Input, FormHelperText,} from '@mui/material';
import styles from './account.module.css';
import styled from 'styled-components';
import apiProtect from '../axios/apiProtect';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const PreferenceMain = styled(Container)`
margin:1rem auto;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
animation: showUpp 1s ease-in-out;
@keyframes showUpp {
    from {
        opacity:0;
    }
    to {opacity:1;}
}
`;

const SitePreferenceForm = () => {
    const theme = useTheme();
    const { sitePreference, setSitePreference,user_id,setSentToServer } = useContext(TokenAccessContext);
    const [site, setSite] = useState("");
    const [ans1, setAns1] = useState("");
    const [ans2, setAns2] = useState("");
    const [ans3, setAns3] = useState("");
    const [sitePreferenceFill, setSitePreferenceFill] = useState({loaded:false,data:{}});
    const params=sitePreferenceFill.loaded && sitePreferenceFill.data ? sitePreferenceFill.data:null;

    useMemo(()=>{
        setSitePreferenceFill({
            loaded:true,
            data:{
                ans1:ans1,
                ans2:ans2,
                ans3:ans3,
                site:site,
                user_id:user_id
            }

        })
    },[setSitePreferenceFill,ans1,ans2,ans3,site,user_id]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(params){
            try {
                const res= await apiProtect.post('account/sitePreference/',params);
                const body=res.data;
                setSitePreference({loaded:true,data:body})
                setSentToServer(true)
            } catch (error) {
                console.error(error.message)
            }
        }

    }

    
    return (
        <PreferenceMain maxWidth="sm">
            <Card elevation={10}>
                <form>
                    <FormLabel className={styles.formLabel} component="div" color="primary" filled={true}>preferred Site address</FormLabel>
                    <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                        <InputLabel htmlFor="name">Please enter your preferred site</InputLabel>
                        <Input
                            id="site"
                            name="site"
                            aria-describedby="Your preferred site address"
                            value={site}
                            onChange={(e) => setSite(e.target.value)}
                        />
                        {site !=="" ? <span className={styles.validName}><CheckCircleOutlineIcon /></span>
                            : <span className={styles.not}><CloseIcon /> </span>}
                        <FormHelperText id={styles.extraInfo}>ie:www.site.com or https://www,,</FormHelperText>
                    </FormControl>
                    <FormLabel className={styles.formLabel} component="div" color="primary" filled={true}>Your first answer</FormLabel>
                    <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                        <InputLabel htmlFor="cell">{sitePreference.loaded && sitePreference.data.q1}</InputLabel>
                        <Input
                            id="cell"
                            name="cell"
                            aria-describedby="Your Cell number"
                            value={ans1}
                            onChange={(e) => setAns1(e.target.value)}
                            
                        />
                        {ans1 !=="" ? <span className={styles.validCell}><CheckCircleOutlineIcon /></span>
                            : <span className={styles.not}><CloseIcon /></span>}
                        <FormHelperText id={styles.extraInfo}>This will help us design what you want</FormHelperText>

                    </FormControl>
                    <FormLabel className={styles.formLabel} component="div" color="primary" filled={true}>Your 2<sup>nd</sup> answer </FormLabel>
                    <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                        <InputLabel id="ans2" htmlFor="ans2">{sitePreference.loaded && sitePreference.data.q2}</InputLabel>
                        <Input
                            id="ans2"
                            name="ans2"
                            aria-describedby="valid address"
                            value={ans2}
                            onChange={(e) => setAns2(e.target.value)}
                            
                        />
                        {
                            ans2 !=="" ? <span className={styles.validAddress}><CheckCircleOutlineIcon /></span>
                                :
                                <span className={styles.not}><CloseIcon /> </span>
                        }
                        <FormHelperText id={styles.extraInfo}>This will help us with styles</FormHelperText>
                    </FormControl>

                    <FormLabel className={styles.formLabel} component="div" color="primary" filled={true}>Your 3<sup>rd</sup> answer </FormLabel>
                    <FormControl className={styles.formControl} size="medium" variant="filled" sx={{ border: "1px solid black", flexGrow: 1, width: "100%", position: "relative" }}>
                        <InputLabel id="ans3" htmlFor="ans3">{sitePreference.loaded && sitePreference.data.q3}</InputLabel>
                        <Input
                            id="ans3"
                            name="ans3"
                            aria-describedby="valid address"
                            value={ans3}
                            onChange={(e) => setAns3(e.target.value)}
                            
                        />
                        {
                            ans3 !=="" ? <span className={styles.validAddress}><CheckCircleOutlineIcon /></span>
                                :
                                <span className={styles.not}><CloseIcon /> </span>
                        }
                        <FormHelperText id={styles.extraInfo}>This will help us with getting it right for you</FormHelperText>
                    </FormControl>
                    <Fab variant="extended" siz="medium" color="success" sx={{margin:"1rem auto"}} onClick={(e)=>handleSubmit(e)}>
                        submit preference
                    </Fab>
                </form>
            </Card>

        </PreferenceMain>
    )
}

export default SitePreferenceForm