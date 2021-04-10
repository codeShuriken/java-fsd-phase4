package com.hclfsd.team10jan.capstone.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.hclfsd.team10jan.capstone.entities.Category;
import com.hclfsd.team10jan.capstone.entities.Genre;
import com.hclfsd.team10jan.capstone.entities.Result;
import com.hclfsd.team10jan.capstone.entities.User;
import com.hclfsd.team10jan.capstone.exceptions.ForeignKeyException;
import com.hclfsd.team10jan.capstone.services.CategoryService;
import com.hclfsd.team10jan.capstone.services.GenreService;
import com.hclfsd.team10jan.capstone.services.ProductService;
import com.hclfsd.team10jan.capstone.services.UserService;

import net.bytebuddy.matcher.ModifierMatcher.Mode;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private GenreService genreService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CategoryService categoryService;
	
	@Autowired
	private ProductService productService;
	
	@GetMapping("/customers")
	public String getCustomers(ModelMap model) {
		Iterable<User> users = userService.getAllUsers();
		model.addAttribute("user", users);
		return "customers";
	}
	
	@GetMapping("/products")
	public String getProducts() {
		return "products";
	}
	
	@GetMapping("/genres")
	public String getGenres(ModelMap model) {
		Iterable<Genre> genres = genreService.getAllGenres();
		//System.out.println("Here in genres: " + genres);
		model.addAttribute("genres", genres);
		return "genres";
	}
	
	@GetMapping(path="/addGenre")
	public String addGenre(ModelMap model) {
		Genre genre = new Genre();
		model.addAttribute("genre", genre);
		return "genreForm";
	}
	
	@PostMapping(path="/saveGenre")
	public String saveTask(Genre genre) {
		System.out.println(genre);
		genreService.saveGenre(genre);
		return "redirect:/admin/genres";
	}
	
	@GetMapping(path="/updateGenre")
	public String updateGenre(@RequestParam(value="genreId") Integer id, ModelMap model) {
		Genre genre = genreService.findById(id);
		System.out.println(genre);
		
		model.addAttribute("genre", genre);
		return "genreForm";
	}
	
	@GetMapping(path="/deleteGenre")
	public String deleteGenre(@RequestParam(value="genreId") Integer id) {
		try {
			genreService.deleteGenre(id);
		}catch(Exception ex) {
			throw new ForeignKeyException();
		}
		return "redirect:/admin/genres";
	}
	
	@GetMapping("/categories")
	public String getCategories(ModelMap model) {
		Iterable<Category> categories = categoryService.getAllCategories();
		model.addAttribute("categories", categories);
		return "categories";
	}
	
	@GetMapping("/categoryForm")
	public String addCategory(ModelMap model) {
		Category category = new Category();
		Iterable<Genre> genres = genreService.getAllGenres();
		model.addAttribute("category", category);
		model.addAttribute("genres", genres);
		return "categoryForm";
	}
	
	@PostMapping(path="/saveCategory")
	public String saveTask(Category category) {
		System.out.println(category);
		categoryService.saveCategory(category);
		return "redirect:/admin/categories";
	}
	
	
	@GetMapping(path="/updateCategory")
	public String updateCategory(@RequestParam(value="categoryId") Integer id, ModelMap model) {
		Category category = categoryService.findById(id);
		System.out.println(category);
		Iterable<Genre> genres = genreService.getAllGenres();

		model.addAttribute("category", category);
		model.addAttribute("genres", genres);
		
		return "categoryForm";
	}
	
	@GetMapping(path="/deleteCategory")
	public String deleteCategory(@RequestParam(value="categoryId") Integer id) {
		try {
			categoryService.deleteCategory(id);
		}catch(Exception e) {
			throw new ForeignKeyException();
		}
		return "redirect:/admin/categories";
	}
	
	@GetMapping("/products1")
	public String getProducts1(ModelMap model) {
		Iterable<Result> results = productService.getAll();
		model.addAttribute("results", results);
		return "products1";
	}
	
	@GetMapping("/addTrack")
	public String addTrack(ModelMap model) {
		Iterable<Category> categories = categoryService.getAllCategories();
		Iterable<Genre> genres = genreService.getAllGenres();
		Result res = new Result();
		
		model.addAttribute("res", res);
		model.addAttribute("categories", categories);
		model.addAttribute("genres", genres);
		model.addAttribute("type1", "Track");
		return "productForm";
	}
	
	@GetMapping("/addAlbum")
	public String addAlbum(ModelMap model) {
		Iterable<Category> categories = categoryService.getAllCategories();
		Iterable<Genre> genres = genreService.getAllGenres();
		Result res = new Result();
		
		model.addAttribute("res", res);
		model.addAttribute("categories", categories);
		model.addAttribute("genres", genres);
		model.addAttribute("type1", "Album");
		return "productForm";
	}
	
	@PostMapping("/saveProduct")
	public String saveProduct(@RequestParam(value="type1") String type, @RequestParam(value="title") String title, @RequestParam(value="artist") String artist,
			@RequestParam(value="price") Double price, @RequestParam(value="category") Category category, @RequestParam(value="genre") Genre genre, 
			@RequestParam(value="description") String description) {
		
		if (type.equals("Track")) {
			productService.saveTrack(type, title, artist, price, category, genre, description);
		}else {
			productService.saveAlbum(type, title, artist, price, category, genre, description);
		}
		
		return "redirect:/admin/products1";
	}
	
	@GetMapping("/aboutProduct")
	public String aboutProduct(@RequestParam(value="productId") Integer id, ModelMap model) {
		Result res = productService.findById(id);
		model.addAttribute("res", res);
		return "aboutProduct";
	}
	
	@GetMapping("/updateProduct1")
	public String updateProduct1(@RequestParam(value="productId") Integer id, ModelMap model) {
		Iterable<Category> categories = categoryService.getAllCategories();
		Iterable<Genre> genres = genreService.getAllGenres();

		Result res = productService.findById(id);
		model.addAttribute("categories", categories);
		model.addAttribute("genres", genres);
		model.addAttribute("res", res);
		
		System.out.println("UPDATE FORM INPUT: " + res);
		return "updateProductForm";
	}
	
	@PostMapping("/updateProduct")
	public String updateProduct(Result res) {
		System.out.println("DATA TO UPDATE: " + res);
			
		if (res.getType().equals("Track")) {
			productService.updateTrack(res);
		}else {
			productService.updateAlbum(res);
		}
		
		return "redirect:/admin/products1";
	}
	
	@GetMapping("/deleteProduct")
	public String deleteProduct(@RequestParam(value="productId") Integer id, ModelMap model) {
		Result res = productService.findById(id);
		productService.deleteProduct(res);
		return "redirect:/admin/products1";
	}
	
}