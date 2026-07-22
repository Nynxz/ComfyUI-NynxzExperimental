"""Generative Qwen3-VL nodes — the model as an LLM, not just a text encoder.

ComfyUI 0.28+ ships a native autoregressive path for Qwen3-VL (`BaseGenerate.generate` in
`comfy/text_encoders/llama.py`, wrapped by `Qwen3VLClipModel.generate`), and the Qwen3-VL 4B/8B
configs load the LM head (`lm_head = True`). So the same CLIP the fusion nodes use as an *encoder*
can also *generate text* — no llama.cpp, no transformers, no extra model load. These nodes drive
that path: describe/VQA today, visual grounding (bboxes → fusion regions) next.
"""
