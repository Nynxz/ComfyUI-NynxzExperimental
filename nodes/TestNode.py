from comfy_api.latest import io

from ._base import NynxzNode


class TestNEN(NynxzNode):
    @classmethod
    def define_schema(cls) -> io.Schema:
        return cls.make_schema(
            node_id="Test",
            display_name="Nynxz Test",
            description="Testing",
            inputs=[],
            outputs=[],
        )

    @classmethod
    def execute(cls) -> io.NodeOutput:
        return io.NodeOutput()
