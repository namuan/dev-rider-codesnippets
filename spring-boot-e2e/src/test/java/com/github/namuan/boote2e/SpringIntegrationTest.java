package com.github.namuan.boote2e;

import com.github.tomakehurst.wiremock.WireMockServer;
import io.cucumber.spring.CucumberContextConfiguration;
import io.restassured.response.Response;
import io.restassured.response.ValidatableResponse;
import io.restassured.specification.RequestSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@CucumberContextConfiguration
@SpringBootTest(classes = Boote2eApplication.class)
public class SpringIntegrationTest {

    protected RequestSpecification requestSpecification;

    protected Response response;

    protected ValidatableResponse json;

    @Value("${spring.profiles.active}")
    protected String activeProfile;

    @Autowired
    protected WireMockServer wireMockServer;

    protected boolean runningWithDevProfile() {
        return activeProfile.equalsIgnoreCase("dev");
    }
}
