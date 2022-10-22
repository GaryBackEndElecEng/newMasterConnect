

//The callback() is a function that executes a useState()=> loaded,setLoaded() in <Home/> so that the P5.
//callback=()=>{setLOaded(true)} within useEffect(()=>{},[])
const loadP5 = (callback) => {
    const existingScript = document.getElementById('scriptP5');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js";
      script.id = 'scriptP5';
      document.body.appendChild(script);
      script.onload = () => { 
        if (callback) callback();
      };
    }
    if (existingScript && callback) callback();
  };
  export default loadP5;