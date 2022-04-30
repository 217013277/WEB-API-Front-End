import React from 'react';
//import articles from './data/articles.json';
import http from '../common/http-common.js'
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import NotFound from './notfound'

function DetailArticle(props) {    
  const { aid } = useParams();  
  const navigate = useNavigate();
  const [article, setArticle] = React.useState(null)
  React.useEffect(()=> {
    http.get(`/articles/${aid}`)
    .then((response)=>{
      setArticle(response.data)
    })
  }, []) 
  
  if(!article){
    return (
      <NotFound />
    )
  } else { 
    console.log(article)
    return(
        <>    
          <h1>{article.title}</h1>
          <p>{article.alltext}</p>            
          <Button type="primary" icon={<RollbackOutlined />} onClick={()=>navigate(-1)} />
        </>
      );
  }
  
  //for(const article of articles) {  
  /*if(article.id==aid)  {      
      return(
        <>    
          <h1>{article.title}</h1>
          <p>{article.fullText}</p>            
          <Button type="primary" icon={<RollbackOutlined />} onClick={()=>navigate(-1)} />
        </>
      );
    }*/
  //}
}
export default DetailArticle;
