package main

import "testing"

func TestEncode(t *testing.T) {
	type args struct {
		src string
	}
	tests := []struct {
		name string
		args args
	}{
		{"should encode string to base64 string", args{src: "Hello World"}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := Encode(tt.args.src)
			expected := "SGVsbG8gV29ybGQ="

			if got != expected {
				t.Errorf("got %q, expected %q", got, expected)
			}
		})
	}
}
