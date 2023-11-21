import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         posts:[],
         selectedPostId:null
      }
    }
    

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then( response => this.setState({posts:response.data.slice(0,3)}))
        .catch(err => console.log(err.message));
    }
    postClickHandler = (id) => {
     this.setState({selectedPostId:id})
    }
    render () {
        const postData = this.state.posts.map(
            (post) => {
                return (
                    <Post 
                    key={post.id} 
                    title={post.title} 
                    click={() => this.postClickHandler(post.id)}
                    />
                )
            }
        )
         
        return (
            <div>
                <section className="Posts">
                   {postData}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;