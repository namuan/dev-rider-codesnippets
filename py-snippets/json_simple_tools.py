import json


def format_json(json_obj):
    return json.dumps(json_obj, indent=4)


def minify_json(json_obj):
    return json.dumps(json_obj, separators=(",", ":"))


def load_json(raw_json):
    return json.loads(raw_json)


def test_load_json():
    raw_json = """
{
   "name": "john doe"
}    
    """

    json_obj = load_json(raw_json)
    assert json_obj.get("name") == "john doe"
