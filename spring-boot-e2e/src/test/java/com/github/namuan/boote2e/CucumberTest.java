package com.github.namuan.boote2e;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        plugin = {"pretty", "summary", "html:target/report.html", "json:target/report.json"}
        , features = {"src/test/resources"}
)
public class CucumberTest {

}
