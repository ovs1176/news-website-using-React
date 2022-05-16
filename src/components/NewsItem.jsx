import React, { Component } from 'react';
import altimg from '../internationalnews.png'

export class NewsItem extends Component {

    render() {
        let {title, description, imgurl, newsurl, author, date} = this.props;
        return <div className='my-3'>
            <div className="card" style={{width: "auto"}}>
                <img src={ !imgurl? 'https://www.oxfordurbanretail.com/wp-content/uploads/international-news-logo.png' : imgurl } className="card-img-top" alt={altimg}/>
                    <div className="card-body">
                        <h5 className="card-title">{title ? title : ""}</h5>
                        <p className="card-text">{description}<span>....<a href={newsurl} target="_blank" rel="noreferrer">more</a> </span> </p>
                        <p className='card-text'> <small className='text-muted'> By {author ? author:"Unknown"} on {new Date(date).toGMTString()} </small></p>
                    </div>
            </div>
        </div>
    }
}

export default NewsItem;