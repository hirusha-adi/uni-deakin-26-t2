# Source Code

This is a markdown file containing all the main parts of the source code for this updated project.

- `java/edu/deakin/sit218/coachwebapp/Client.java`

```java
package edu.deakin.sit218.coachwebapp;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import javax.validation.constraints.Pattern;
//import org.hibernate.validator.constraints

public class Client {

	@NotNull(message = "is required")
	@Size(min = 3, message="is not long enough")
	@Pattern(regexp ="[a-zA-Z]+", message="incorrect format")
	protected String name;
	
	// Uncomment the lines below if you want to validate the age too
	// but it didn't seem like this was a requirement of this task
	//@NotNull(message = "is required")
	//@Min(value=18, message = "You must be 18 years old or older")
	//@Max(value=120, message = "Vampires are not allowed")
	protected int age;

	@NotNull(message = "is required")
	@Pattern(regexp = "^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+\\.com$", message = "must be a valid email address, e.g. name@domain.com")
	protected String email;

	@NotNull(message = "is required")
	//@NotEmpty(message = "is required")
	@Size(max = 200, message = "must not exceed 200 characters")
	@Pattern(regexp = "^[a-zA-Z0-9 .,!?@#*_-]*$", message = "contains unsupported characters")
	protected String message;

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
```

- `java/edu/deakin/sit218/coachwebapp/ClientController.java`

```java
package edu.deakin.sit218.coachwebapp;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/client")
public class ClientController {
	
	@RequestMapping("/showForm")
	public String showForm(Model model) {
		// Create a client object
		Client client = new Client();
		
		// add client object to model
		model.addAttribute("client", client);
		
		return "client-form";
	}
	
}
```

- `java/edu/deakin/sit218/coachwebapp/CoachController.java`

```java
package edu.deakin.sit218.coachwebapp;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/workout")
public class CoachController {

	@RequestMapping("/processForm")
	public String workout(
			@Valid @ModelAttribute("client") Client client,
			BindingResult validationErrors, Model model
	) {
		//Input validation
		if (validationErrors.hasErrors())
			return "client-form";
//			throw new IllegalArgumentException("Invalid Input");
		
		//Logic when there is no error
		else if (client.age < 40) {
			model.addAttribute("message", "Hey, " + client.getName() +
					" you are still too young, no need to work out!");
		}
		
		else {
			model.addAttribute("message", client.getName() +
					", please, run for 30 min");
		}
		
		model.addAttribute("email", client.getEmail());
		model.addAttribute("userMessage", client.getMessage());
		return "workout";
	}

}
```

- `webapp/WEB-INF/view/client-form.jsp`

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
<title>Client Registration Form</title>

	<style>
		.error {color:red}
	</style>

</head>
<body>

	<form:form action="${pageContext.request.contextPath}/workout/processForm" 
		modelAttribute="client" >
		Name: <form:input path="name" />
		<form:errors path="name" cssClass="error" />
		
		<br><br>
		
		Age: <form:input path="age" />
		<form:errors path="age" cssClass="error" />

		<br><br>

		Email: <form:input path="email" type="email"
			pattern="[a-zA-Z0-9._]+@[a-zA-Z0-9-]+\.com" title="Enter a valid email address, e.g. name@domain.com" required="required" />
		<form:errors path="email" cssClass="error" />

		<br><br>

		Message <br>
		<form:textarea path="message" rows="4" cols="40"
			maxlength="200" required="required" />
		<form:errors path="message" cssClass="error" />

		<br><br>

		<input type="submit" value="Submit" />
	</form:form>

</body>
</html>
```

- `webapp/WEB-INF/view/workout.jsp`

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>sit218 Secure Coding - First Spring-based dynamic web app</title>
</head>
<body>

	<h1>${message}</h1>
	<p>
		Your message "${userMessage}" was received and you <br />
		will be contacted via your email: ${email} for further information.
	</p>

</body>
</html>
```

- `webapp/index.jsp`

```jsp
<% response.sendRedirect("client/showForm"); %>
```




