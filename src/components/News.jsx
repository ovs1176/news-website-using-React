import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class news extends Component {
    static defaultProps = {
        pageSize: 18,
        country: "in",
        category: "general",
    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category.toUpperCase()} - top headlines`;
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.props.setProgress(40);
        let data = await fetch(url);  
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 });
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
            articles: this.state.articles? this.state.articles.concat(parseData.articles) : parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
    }
   
// we should not write api key in comment also... 
// https://newsdata.io/api/1/news?apikey=pub_4281cfc955e46ba400b3b66edd028364ad4f&country=in&category=entertainment&language=en&page=0&pagesize=5
    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center my-30' style={{  margin : '70px auto 10px auto' }}>News International - <span style={{ color: "#ec403c" }}>{this.props.category.toUpperCase()}</span> - Top Headlines</h1>

                {this.state.loading && <Spinner/>}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container row">


                        {this.state.articles.map((element) => {
                            return (
                                <div className='col-md-4' key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>

            </div>
        );
    }
}

export default news;
