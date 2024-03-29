import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import './HomeMainbar.css'
import QuestionList from './QuestionList'
import ChatbotIcon from '../ChatbotIcon/ChatbotIcon'

const HomeMainbar = () => {

  const location = useLocation()
  const user = 1;
  const navigate = useNavigate()

  const questionsList = useSelector(state => state.questionsReducer)

    const checkAuth = () => {
      if(user === null){
        alert("login or signup to ask a question") 
        navigate('/Auth')
      }else{
        navigate('/AskQuestion')
      }
    }

  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {
          location.pathname === '/' ? <h1>Top Solution</h1> : <h1>All Solution</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
        <div>
          {
            questionsList.data === null ? <h1>Loading...</h1> : 
            <>
              <p>{ questionsList.data.length } Questions</p>
              <QuestionList questionsList={questionsList.data} />
            </>
          }
        </div>
        <ChatbotIcon/>
    </div>
  )
}

export default HomeMainbar