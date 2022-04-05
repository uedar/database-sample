import json
import re
import os

paths = [
    os.path.join(root, file)
    for root, dirs, files in os.walk("./public/data")
    for file in files
]

metadata_array = []
for path in paths:
    js = json.load(open(path, "r"))["1"]
    write_json = {
        "uuid": js["unique_id"],
        "display_name": path.split("/")[-1][:-5],
        "type": path.split("/")[-2],
        "calculator": js["calculator"],
        "detail_path": re.search("(?<=data/)(.*)", path).group(),
    }
    metadata_array.append(write_json)

f = open("./src/Metadata.ts", "w")
txt = "export const Metadata =" + str(metadata_array)
print(txt)
f.write(txt)
f.close()
