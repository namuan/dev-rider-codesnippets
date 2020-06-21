package com.github.namuan.boote2e;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;

import static com.github.tomakehurst.wiremock.client.WireMock.configureFor;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class HttpBinStub {
    private final WireMockServer wireMockServer;

    public HttpBinStub(WireMockServer wireMockServer) {
        this.wireMockServer = wireMockServer;
        this.start();
    }

    public void setupStubForGetRequest() {
        this.wireMockServer.stubFor(
                WireMock.get("/get").willReturn(
                        WireMock.aResponse()
                                .withStatus(OK.value())
                                .withHeader("Content-Type", APPLICATION_JSON_VALUE)
                                .withBodyFile("responses/httpbin_get.json")
                )
        );
    }

    public void start() {
        wireMockServer.start();
        configureFor("localhost", wireMockServer.port());
        wireMockServer.resetAll();
    }

    public void stop() {
        wireMockServer.stop();
    }
}
