package com.github.namuan.boote2e;

import com.github.tomakehurst.wiremock.WireMockServer;
import io.cucumber.spring.CucumberContextConfiguration;
import io.restassured.response.Response;
import io.restassured.response.ValidatableResponse;
import io.restassured.specification.RequestSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.ConfigFileApplicationContextInitializer;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@CucumberContextConfiguration
@SpringJUnitConfig(initializers = ConfigFileApplicationContextInitializer.class)
@Import(value = {TestConfiguration.class})
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
