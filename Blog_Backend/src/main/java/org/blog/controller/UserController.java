package org.blog.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.blog.model.User;
import org.blog.repository.UserRepository;
import org.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/blog/")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository repository; 
 	
	@PostMapping("/signup")
	public ResponseEntity<Map<String,String>> singup(@RequestBody User user)
	{
		
		Map<String,String> response=new HashMap<String,String>();
		System.out.println(">>>>>>>>>>>>" + user.getRole());
		if (!user.getRole().equals("admin") && !user.getRole().equals("user")) {
			response.put("status", "failed");
			response.put("message", "Role is not exists");
			return new ResponseEntity<Map<String,String>>(response,HttpStatus.BAD_REQUEST);
		}
		System.out.println("&&&&&&&&&&");
		this.userService.addUser(user);
		response.put("status", "success");
		response.put("message", "User registered!!");
		
		return new ResponseEntity<Map<String,String>>(response,HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String,String>> login(@RequestBody User user )
	{
		System.out.println(">>>>>>>"+ user.getUserEmail());
		Optional<User> existingUser=this.userService.getUserByEmail(user.getUserEmail());
		Map<String,String> response=new HashMap<String,String>();
		if(existingUser.isPresent())
		{
			if(existingUser.get().getUserPassword().equals(user.getUserPassword()))
			{
				
				response.put("status", "success");
				response.put("message", "User authenticated");
				response.put("userId",String.valueOf( existingUser.get().getUserId()) );
				response.put("role", existingUser.get().getRole());
				response.put("userName", existingUser.get().getUserName());
				return new ResponseEntity<Map<String,String>>(response,HttpStatus.OK);
			}
			else
			{
				response.put("status", "Failed");
				response.put("message", "User password inncorrect");
				return new ResponseEntity<Map<String,String>>(response,HttpStatus.NOT_FOUND);
			}
		}		
		else
		{
			response.put("status", "Failed");
			response.put("message", "User email does not exist");
			return new ResponseEntity<Map<String,String>>(response,HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUSers()
	{
		return new ResponseEntity<List<User>>(this.repository.findAll(),HttpStatus.OK);
	}
	
	@DeleteMapping("/user/{userId}")
	public ResponseEntity<Map<String,String>> deleteUser(@PathVariable long userId)
	{
		Map<String,String> response=new HashMap<String,String>();
		if(this.repository.findById(userId).isPresent())
		{
			this.repository.delete(this.repository.findById(userId).get());
			response.put("status", "Success");
			response.put("message", "User deleted!!");
			return new ResponseEntity<Map<String,String>>(response,HttpStatus.OK);
		}
		else
		{
			response.put("status", "failed");
			response.put("message", "User does not exist!!");
			return new ResponseEntity<Map<String,String>>(response,HttpStatus.NOT_FOUND);
		}
		
	}
	
}
