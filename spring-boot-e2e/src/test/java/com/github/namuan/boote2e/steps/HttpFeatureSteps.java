package com.github.namuan.boote2e.steps;

import com.github.namuan.boote2e.HttpBinStub;
import com.github.namuan.boote2e.SpringIntegrationTest;
import com.github.tomakehurst.wiremock.WireMockServer;
import io.cucumber.java8.En;
import io.restassured.RestAssured;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import static org.springframework.http.HttpStatus.OK;

public class HttpFeatureSteps extends SpringIntegrationTest implements En {

    private HttpBinStub httpBinStub;

    @Value("${httpbin.url}")
    private String httpbinUrl;

    @Autowired
    private WireMockServer wireMockServer;

    public HttpFeatureSteps() {
        Before(() -> httpBinStub = new HttpBinStub(wireMockServer));

        After(() -> httpBinStub.stop());

        Given("^a request$", () -> {
            requestSpecification = RestAssured.given().baseUri(httpbinUrl);

            if (runningWithDevProfile()) {
                httpBinStub.setupStubForGetRequest();
            }
        });

        When("^it is processed$", () ->
                response = requestSpecification.when().get("/get"));

        Then("^it should response with correct status code$", () ->
                response.then().statusCode(OK.value()));
    }

}
