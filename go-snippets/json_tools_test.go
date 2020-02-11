package main

import "testing"

func TestLoadJson(t *testing.T) {
	rawJson := `{"Name":"John Doe","Age":99}`
	expected := JsonMessage{
		Name: "John Doe",
		Age:  99,
	}

	if gotJsonString := LoadJson(rawJson); gotJsonString != expected {
		t.Errorf("LoadJson() = %v, want %v", gotJsonString, expected)
	}
}

func TestMarshalJson(t *testing.T) {
	message := JsonMessage{
		Name: "John Doe",
		Age:  88,
	}
	expected := `{"Name":"John Doe","Age":88}`
	if gotJsonMessage := MarshalJson(message); gotJsonMessage != expected {
		t.Errorf("LoadJson() = %v, want %v", gotJsonMessage, expected)
	}
}

func TestFormatJson(t *testing.T) {
	rawJson := `{"Name":"John Doe","Age":88}`
	expected := `{
    "Name": "John Doe",
    "Age": 88
}`

	if gotFormattedJson := FormatJson(rawJson); gotFormattedJson != expected {
		t.Errorf("LoadJson() = %v, want %v", gotFormattedJson, expected)
	}
}

func TestMinifyJson(t *testing.T) {
	formattedJson := `{
    "Name": "John Doe",
    "Age": 88
}`
	expected := `{"Name":"John Doe","Age":88}`

	if gotMinifiedJson := MinifyJson(formattedJson); gotMinifiedJson != expected {
		t.Errorf("LoadJson() = %v, want %v", gotMinifiedJson, expected)
	}
}