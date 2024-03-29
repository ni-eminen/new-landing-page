import './App.css';
import CV from './imgs/CV.jpg'
import selfImg from './imgs/self.png'
import locationImg from './imgs/placeholder.png'
import emailImg from './imgs/email.png'
import cityLights from './imgs/city-lights.png'
import speedtestImg from './imgs/speedtest.png'
import quizImg from './imgs/quizcrop.png'
import acLogo from './imgs/ac_logo.PNG'
import onlineCVImg from './imgs/online-cv.png'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { useSpring, useTransition, animated } from 'react-spring'
import { useState } from 'react';

//Pdf viewer
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const InfoBlock = ({img, text, link}) => {
  return (
    <div className='container'>
      <img src={img} style={{height: "3em", verticalAlign: "middle"}} alt="A location pin"/>
      {link ?
      <a href={link} style={{display: "inline-block", verticalAlign: "middle", marginLeft: "10px", color: "white", textDecoration: "none"}}>{text}</a> :
      <p style={{display: "inline-block", verticalAlign: "middle", marginLeft: "10px"}}>{text}</p>
      }
    </div>
  )
}

const SimpleCard = ({title, text, img, button1text, button2text, button1link, button2link}) => {
  return (
    <div className='cardwrapper'> 
      <Card sx={{ width: "100%", height: "100%" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        {/* rendering buttons if they have content */}
        <CardActions>
          {button1text && 
          <Button target='_blank' sx={{position: "absolute", bottom: ".5em", left: "1em", color: "purple"}} href={button1link} size="small">{button1text}</Button>
          }
          {button2text && 
          <Button target='_blank' sx={{position: "absolute", bottom: ".5em", left: "6em", color: "purple"}} href={button2link} size="small">{button2text}</Button>
          }
        </CardActions>
      </Card>
    </div>
  )
}

function App() {
  //Spring test
  const [toggle, setToggle] = useState(false)

  const [projectsFade, projectsFadeApi] = useSpring(() => ({opacity: 1, transform: 'translate(0px)'}))
  const [CVfade, CVFadeApi] = useSpring(() => ({opacity: 0, transform: 'translate(1000px)'}))
  

  const toggleProjects = () =>{
    if (toggle) {
      projectsFadeApi({opacity: 1, transform: 'translate(0px)'})
      return
    }
    projectsFadeApi({opacity: 0, transform: 'translate(-50px)'})
  }

  const toggleCV = () => {
    if (!toggle) {
      CVFadeApi({opacity: 1, transform: 'translate(0px)'})
      return
    }
    CVFadeApi({opacity: 0, transform: 'translate(1000px)'})
  }

  const toggleView = () => {
      setTimeout(() => {
        toggle ?  toggleProjects() :
                  toggleCV()
        setToggle(!toggle)
      }, 200)
      toggle ?  toggleCV() :
                toggleProjects()
  }

  //For CV and Projects buttons
  const buttonStyle = {
    marginLeft: '1em'
  }

  return (
    <div className="App">
      <div className='leftPane'>
        <img id='selfImg' src={selfImg} alt="Matias Nieminen"/>
        <div className='textbox'>
          <h2>Matias Nieminen</h2>
            <InfoBlock img={locationImg} text={'Helsinki, Finland'}></InfoBlock>
            <InfoBlock link='mailto:matiasnie2@gmail.com' img={emailImg} text={'matiasnie2@gmail.com'}></InfoBlock>
        </div>
      </div>
      <div className='rightPane'>
        <div id='buttons'>
        <Button style={{marginLeft: '5px'}} variant='contained' onClick={() => toggleView()}>{toggle ? 'Projects' : 'CV'}</Button>
        </div>
        <animated.div id='cardsSpring' style={projectsFade}>
          <div id='cards'>
            <SimpleCard
              title='JYY Quiz'
              text='A commission by JYY to accommodate freshers to the city of Jyväskylä'
              img={quizImg}
              button1text='Project'
              button2text='Git'
              button1link='https://matiasnieminen.fi/NewQuiz/'
              button2link='https://github.com/ni-eminen/jyy-peli' />
            <SimpleCard
              title='Typing speed test'
              text='Work in progress. Simple typing speed test game with leaderboards.'
              img={speedtestImg}
              button1text='Project'
              button2text='Git'
              button1link='https://matiasnieminen.fi/speed-test/'
              button2link='https://github.com/ni-eminen/TypingSpeedTest' />
            <SimpleCard
              title='Algorithm Cache'
              text='Algorithm Cache is a JavaFX practice project that helps store and manage different kinds of algorithms.'
              img={acLogo}
              button1text='Git'
              button2text=''
              button1link='https://gitlab.jyu.fi/matoskni/ohj2'
              button2link='' />
            <SimpleCard
              title='This online CV'
              text='Contact me and you can be cool too...'
              img={onlineCVImg}
              button1text='Git'
              button2text=''
              button1link='https://github.com/ni-eminen/new-landing-page'
              button2link='' />
          </div>
        </animated.div>
        <div id='cvWrapper' style={{width: '100%', overflowX: 'hidden'}}>
        <animated.div id='CVdiv' style={CVfade}>
          <img src={CV} id='cv'></img>
        </animated.div>
        </div>
      </div>
    </div>
  );
}

export default App;
