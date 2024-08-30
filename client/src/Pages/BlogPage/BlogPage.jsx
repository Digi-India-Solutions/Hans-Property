import React from 'react'
import { Link } from 'react-router-dom';

const newsItems = [
    {
        id: 1,
        image: 'https://assets-news.housing.com/news/wp-content/uploads/2022/09/14152436/DDA-Housing-Scheme-2022-shutterstock_1140375443-1200x700-compressed.jpg',
        link: '/',
        author: 'Rajeev Singh',
        date: '11 September, 2022',
        title: 'Develop Relationships With Human Resource Consectetur',
        excerpt: 'Discover the latest trends and strategies for building strong relationships in human resources. Learn effective techniques and insights.'
    },
    {
        id: 2,
        image: 'https://housing.com/news/wp-content/uploads/2024/06/Desk-setup-ideas-for-creative-people-t.jpg',
        link: '/',
        author: 'Akash Gupta',
        date: '5 October, 2022',
        title: 'Top Real Estate Trends to Watch in 2024',
        excerpt: 'Stay ahead of the curve with the latest real estate trends. Explore what’s coming in 2023 and how it impacts your property decisions.'
    },
    {
        id: 3,
        image: 'https://assets-news.housing.com/news/wp-content/uploads/2017/12/24193612/How-to-apply-for-MHADA-Lottery-Scheme-Thumbnail-300x200-compressed.jpg',
        link: '/',
        author: 'Rajeev Singh',
        date: '11 September, 2022',
        title: 'Develop Relationships With Human Resource Consectetur',
        excerpt: 'Discover the latest trends and strategies for building strong relationships in human resources. Learn effective techniques and insights.'
    },
    {
        id: 1,
        image: 'https://assets-news.housing.com/news/wp-content/uploads/2022/09/14152436/DDA-Housing-Scheme-2022-shutterstock_1140375443-1200x700-compressed.jpg',
        link: '/',
        author: 'Rajeev Singh',
        date: '11 September, 2022',
        title: 'Develop Relationships With Human Resource Consectetur',
        excerpt: 'Discover the latest trends and strategies for building strong relationships in human resources. Learn effective techniques and insights.'
    },
    {
        id: 2,
        image: 'https://housing.com/news/wp-content/uploads/2024/06/Desk-setup-ideas-for-creative-people-t.jpg',
        link: '/',
        author: 'Akash Gupta',
        date: '5 October, 2022',
        title: 'Top Real Estate Trends to Watch in 2024',
        excerpt: 'Stay ahead of the curve with the latest real estate trends. Explore what’s coming in 2023 and how it impacts your property decisions.'
    },
    {
        id: 3,
        image: 'https://assets-news.housing.com/news/wp-content/uploads/2017/12/24193612/How-to-apply-for-MHADA-Lottery-Scheme-Thumbnail-300x200-compressed.jpg',
        link: '/',
        author: 'Rajeev Singh',
        date: '11 September, 2022',
        title: 'Develop Relationships With Human Resource Consectetur',
        excerpt: 'Discover the latest trends and strategies for building strong relationships in human resources. Learn effective techniques and insights.'
    },
    {
        id: 1,
        image: 'https://assets-news.housing.com/news/wp-content/uploads/2022/09/14152436/DDA-Housing-Scheme-2022-shutterstock_1140375443-1200x700-compressed.jpg',
        link: '/',
        author: 'Rajeev Singh',
        date: '11 September, 2022',
        title: 'Develop Relationships With Human Resource Consectetur',
        excerpt: 'Discover the latest trends and strategies for building strong relationships in human resources. Learn effective techniques and insights.'
    },
    {
        id: 2,
        image: 'https://housing.com/news/wp-content/uploads/2024/06/Desk-setup-ideas-for-creative-people-t.jpg',
        link: '/',
        author: 'Akash Gupta',
        date: '5 October, 2022',
        title: 'Top Real Estate Trends to Watch in 2024',
        excerpt: 'Stay ahead of the curve with the latest real estate trends. Explore what’s coming in 2023 and how it impacts your property decisions.'
    },
    {
        id: 3,
        image: 'https://assets-news.housing.com/news/wp-content/uploads/2017/12/24193612/How-to-apply-for-MHADA-Lottery-Scheme-Thumbnail-300x200-compressed.jpg',
        link: '/',
        author: 'Rajeev Singh',
        date: '11 September, 2022',
        title: 'Develop Relationships With Human Resource Consectetur',
        excerpt: 'Discover the latest trends and strategies for building strong relationships in human resources. Learn effective techniques and insights.'
    },
];

const BlogPage = () => {
    return (
        <>

            {/* ----- BreadCrumb ----    */}
            <section className="page__title p_relative">
                <div className="bg-layer parallax-bg" data-parallax="{&quot;y&quot;: 20}" style={{ backgroundImage: 'url(assets/images/resource/page-title.png)' }}>
                </div>
                <div className="container">
                    <div className="content-box p_relative">
                        <h1 className="title">Blog</h1>
                        <ul className="bread-crumb">
                            <li><Link to={`/`}><span className="icon-icon-16" />Home</Link></li>
                            <li><span className="icon-57" />Blog</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="blog__section__two see__pad">
                <div className="container">
                    
                    <div className="row">
                        {newsItems.map((item) => (
                            <div className="col-xl-4 col-lg-6 col-md-12 pb-30" key={item.id}>
                                <div className="news__block__one">
                                    <div className="inner-box">
                                        <div className="image-box">
                                            <figure className="image">
                                                <Link to={item.link}>
                                                    <img src={item.image} alt={item.title} />
                                                </Link>
                                            </figure>
                                        </div>
                                        <div className="lower__content">
                                            <div className="author__info">
                                                <ul>
                                                    <li>
                                                        <Link to={``}><span className="icon-icon-22" /> {item.author}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to={``}><span className="icon-icon-23" /> {item.date}</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="news__title">
                                                <h3> <Link to={item.link}>{item.title}</Link></h3>
                                            </div>
                                            <div className="news__text">
                                                <p>{item.excerpt}</p>
                                            </div>
                                            <div className="more__btn">
                                                <Link to={item.link}>Read More <span className="icon-57" /> </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogPage