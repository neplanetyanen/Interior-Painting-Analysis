import json


def save_to_json(data, filepath):
    """
    Saves the data to a JSON file by given filepath.
    If the file extension is not .json, raises ValueError.
    :param data: data to save
    :param filepath: path to JSON file
    """
    if not filepath.endswith(".json"):
        raise ValueError("Incorrect format of file (must be .json)!")
    else:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
