package com.github.namuan.boote2e;

import com.github.tomakehurst.wiremock.WireMockServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static org.springframework.cloud.contract.wiremock.WireMockSpring.options;

@Configuration
@EnableAutoConfiguration
public class TestConfiguration {
    @Value("${wiremock.port}")
    private int wiremockPort;

    @Bean
    public WireMockServer wiremockserver() {
        return new WireMockServer(options().port(wiremockPort));
    }

}
