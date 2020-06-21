package com.github.namuan.boote2e;

import io.cucumber.spring.CucumberContextConfiguration;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@CucumberContextConfiguration
@SpringBootTest(classes = Boote2eApplication.class)
public class SpringIntegrationTest {

    protected RequestSpecification requestSpecification;


    @Value("${spring.profiles.active}")
    protected String activeProfile;
    protected Response response;

    protected boolean runningWithDevProfile() {
        return activeProfile != null && activeProfile.equalsIgnoreCase("dev");
    }
}
