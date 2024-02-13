import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
   capt=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
   }
    constructor(props){
        super(props);
        this.state={
  articles :  [],
loading:false,
page:1

        }
        document.title=`${this.capt(this.props.category)} - News`
    }
    static defaultProps={
      country: 'in',
      pagesize:8,
      category: 'sports'
    }
    static propTypes={
      country: PropTypes.string,
      pagesize: PropTypes.number,
      category: PropTypes.string
    }
   async componentDidMount(){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc7669d7608d4b068e3b3235e9a22059&page=1&pageSize=${this.props.pagesize}`;
      this.setState({loading:true});
     
      let data= await fetch(url);
      let parsedata=await data.json();
      this.setState({articles: parsedata.articles ,totalresult:parsedata.totalResults,
        loading:false})
      
    }
    handlep=async()=>{
      console.log("p");
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc7669d7608d4b068e3b3235e9a22059&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
      this.setState({loading:true});
     
      let data= await fetch(url);
      let parsedata=await data.json();
      this.setState({
        page:this.state.page-1,
        articles: parsedata.articles,
        loading:false})
    }
    handlen=async()=>{
      if(this.state.page+1>Math.ceil(this.state.totalresult/this.props.pagesize)){

      }
      else{
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bc7669d7608d4b068e3b3235e9a22059&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
      this.setState({loading:true});
      let data= await fetch(url);
      let parsedata=await data.json();
      this.setState({
        page:this.state.page+1,
        articles: parsedata.articles,
      loading:false})
    }}
    
  render() {
    return (
      <>
      <div className="container my-3 justify centre">
        <h2 className='   text-center'>Top {this.capt(this.props.category)} Headlines</h2> 
        {this.state.loading&&<Spinner/>}
       <div className=" container row d-flex justify-content-center">
        {!this.state.loading &&  this.state.articles.map((element)=>{
            return <div className="col-md-4 my-4 d-flex justify-content-center" key={element.url}>
            <Newsitems title={element.title} desc={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>

        })}
        

       </div>
       <div className="container d-flex justify-content-between">
       <button disabled={this.state.page<=1} type="button" className="btn btn-primary  " onClick={this.handlep}>&larr;Previous</button>
       <button disabled={this.state.page+1>Math.ceil(this.state.totalresult/this.props.pagesize)} type="button" className="btn btn-primary mx-4 " onClick={this.handlen}>Next &rarr;</button>
       </div>
      
      </div>
      
       </>

    ) 
  }
}

export default News
