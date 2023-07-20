package org.blog.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.blog.model.Comment;
import org.blog.model.Post;
import org.blog.repository.PostRepository;
import org.blog.repository.UserRepository;
import org.blog.service.CommentService;
import org.blog.service.PostService;
import org.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/blog/")
public class PostController {

	@Autowired
	private PostService service;
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private CommentService commentService;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/post")  //localhost:8080/api/blog/post
	public ResponseEntity<Map<String,String>> addPost(
			@RequestBody Post post) throws IOException
	{
//		Post post=new Post();
//		post.setPostId(postId);
//		post.setPostTitle(postTitle);
//		post.setPostContent(postContent);
//		post.setPostImage(postImage.getBytes());
//		post.setCategory(categoryRepo.findById(Long.parseLong(categoryId)).get());
//		post.setUser(userRepository.findById(Long.parseLong(userId)).get());
		this.service.addPost(post);
		
		Map<String,String> response=new HashMap<String,String>();
		response.put("status", "success");
		response.put("message", "Post added!!");
		return new ResponseEntity<Map<String,String>>(response, HttpStatus.CREATED);
	}
	
	@PutMapping("/post/{postId}/{categoryId}")  //localhost:8080/api/blog
	public ResponseEntity<Map<String,String>> updatePost(
			 @PathVariable("postId") long postId, @PathVariable("categoryId") String categoryId , @RequestBody Post postData) throws IOException
	{
		if(this.service.getPostByPostId(postId).isPresent())
		{
			
		Post post=this.service.getPostByPostId(postId).get();
		post.setPostTitle(postData.getPostTitle());
		post.setPostContent(postData.getPostContent());
		post.setPostImage(postData.getPostImage());
		post.setFavorite(postData.getFavorite());
		post.setDisLike(postData.getDisLike());
		post.setPostlike(postData.getPostlike());
		// post.setCategory();
		
		this.service.addPost(post);
		
		Map<String,String> response=new HashMap<String,String>();
		response.put("status", "success");
		response.put("message", "Post updated!!");
		return new ResponseEntity<Map<String,String>>(response, HttpStatus.OK);
	}
		else
		{
			Map<String,String> response=new HashMap<String,String>();
			response.put("status", "failed");
			response.put("message", "Post not found!!");
			return new ResponseEntity<Map<String,String>>(response, HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/posts")
	public ResponseEntity<List<Post>> getAllPosts()
	{
		return new ResponseEntity<List<Post>>(this.service.getAllPosts(), HttpStatus.OK);
	}
	
	@GetMapping("/posts/{categoryId}")
	public ResponseEntity<List<Post>> getPostsByCategory(@PathVariable("categoryId")long categoryId)
	{
		return new ResponseEntity<List<Post>>(this.service.getPostsByCategory(categoryId),HttpStatus.OK);
	}
	
	@GetMapping("/post/{postId}")
	public ResponseEntity<?> getPostsById(@PathVariable long postId)
	{
		if(this.service.getPostByPostId(postId).isPresent())
		{
			return new ResponseEntity<Post>(this.service.getPostByPostId(postId).get(),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<String>("Post not found!",HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/post/user/{userId}")
	public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable long userId)
	{
		
			return new ResponseEntity<List<Post>>(this.service.getPostsByUserId(userId),HttpStatus.OK);
		
	}
	//localhost:9070/api/blog/post/search?postTitle="World cup"
	@GetMapping("/post/search/")
	public ResponseEntity<?> getPostsByTitle(@RequestParam("postTitle") String postTitle)
	{
		//postTitle=postTitle.toLowerCase();
		if(this.service.getPostByPostTitle(postTitle).isPresent())
		{
			return new ResponseEntity<Post>(this.service.getPostByPostTitle(postTitle).get(),HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<String>("No post found!",HttpStatus.NOT_FOUND);
		}
	}
//	@GetMapping("/post/search/{postTitle}")
//	public ResponseEntity<?> getPostsByTitle(@PathVariable("postTitle") String postTitle)
//	{
//		//postTitle=postTitle.toLowerCase();
//		if(this.service.getPostByPostTitle(postTitle).isPresent())
//		{
//			return new ResponseEntity<Post>(this.service.getPostByPostTitle(postTitle).get(),HttpStatus.OK);
//		}
//		else
//		{
//			return new ResponseEntity<String>("No post found!",HttpStatus.NOT_FOUND);
//		}
//	}
	
	
	@DeleteMapping("/post/{postId}")
	public ResponseEntity<Map<String,String>> deteleByPostId(@PathVariable long postId)
	{
		Map<String,String> response=new HashMap<String,String>();
		try
		{
			System.out.println(">>>>>>>" + postId);
				List<Comment> co = this.commentService.findCommentsByPostId(postId);
				if (co.size() > 0) {
					for (Comment com: co) {
						this.commentService.deleteComment(com.getCommentId());
					}
				}
				this.postRepository.deleteById(postId);
				
				response.put("status", "success");
				response.put("message", "Post deleted!!");
				return new ResponseEntity<Map<String,String>>(response, HttpStatus.OK);	
			}
		catch(Exception e)
		{
			response.put("status", "failed");
			response.put("message", "Post id not found!!");
			return new ResponseEntity<Map<String,String>>(response, HttpStatus.NOT_FOUND);	
		}
	}
	
	
	
	
}
