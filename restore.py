import json
import os

transcript_path = "/Users/nxtwave/.gemini/antigravity-ide/brain/3193a29e-f472-4d04-aff5-899f34d35b94/.system_generated/logs/transcript.jsonl"
target_file = "/Users/nxtwave/Desktop/Live Class V2.2/src/components/LiveClassesV3.tsx"

latest_content = None

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            tool_calls = data.get('tool_calls', [])
            for tc in tool_calls:
                name = tc.get('name')
                args = tc.get('args', {})
                if isinstance(args, str):
                    try:
                        args = json.loads(args)
                    except:
                        pass
                
                tf = args.get('TargetFile')
                if tf:
                    tf = tf.strip('"\'')
                
                if name == 'write_to_file' and tf == target_file:
                    content = args.get('CodeContent')
                    if content:
                        if content.startswith('"') and content.endswith('"'):
                            try:
                                content = json.loads(content)
                            except:
                                pass
                        latest_content = content
                        print(f"Found write_to_file at step {data.get('step_index')}, content length: {len(latest_content)}")
        except Exception as e:
            pass

if latest_content:
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(latest_content)
    print("Successfully restored LiveClassesV3.tsx!")
else:
    print("Could not find any write_to_file for LiveClassesV3.tsx in the transcript.")
