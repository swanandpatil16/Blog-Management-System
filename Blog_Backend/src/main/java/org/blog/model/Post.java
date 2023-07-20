package org.blog.model;


import java.util.Date;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity

public class Post {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long postId;
	
	@Column(length = 50, nullable = false, updatable = true)
	private String postTitle;
	
	@CreationTimestamp
	private Date postCreation;
	
	@UpdateTimestamp
	private Date postUpdation;
	
	@Column(length = 400, nullable = false, updatable = true)
	private String postContent;
	
	@Column(nullable = false)
	@Lob //learge object
	private String postImage;
	
	private Category category;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="userId")
	private User user;
	
	public long getPostId() {
		return postId;
	}

	public void setPostId(long postId) {
		this.postId = postId;
	}

	public String getPostTitle() {
		return postTitle;
	}

	public void setPostTitle(String postTitle) {
		this.postTitle = postTitle;
	}

	public Date getPostCreation() {
		return postCreation;
	}

	public void setPostCreation(Date postCreation) {
		this.postCreation = postCreation;
	}

	public Date getPostUpdation() {
		return postUpdation;
	}

	public void setPostUpdation(Date postUpdation) {
		this.postUpdation = postUpdation;
	}

	public String getPostContent() {
		return postContent;
	}

	public void setPostContent(String postContent) {
		this.postContent = postContent;
	}

	public String getPostImage() {
		return postImage;
	}

	public void setPostImage(String postImage) {
		this.postImage = postImage;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	private int favorite=0;
	private int postlike=0;
	public int getPostlike() {
		return postlike;
	}

	public void setPostlike(int postlike) {
		this.postlike = postlike;
	}

	private int disLike=0;
	
	public int getFavorite() {
		return favorite;
	}

	public void setFavorite(int favorite) {
		this.favorite = favorite;
	}

	

	public int getDisLike() {
		return disLike;
	}

	public void setDisLike(int disLike) {
		this.disLike = disLike;
	}

	
}
