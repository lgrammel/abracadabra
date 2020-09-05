import { Code } from "../editor";
import { Selection } from "../selection";
import { VSCodeEditor } from "./vscode-editor";

export { VueVSCodeEditor };

class VueVSCodeEditor extends VSCodeEditor {
  get code(): Code {
    return super.code.slice(
      this.openingScriptTagOffset,
      this.closingScriptTagOffset
    );
  }

  get selection(): Selection {
    const offsetCodeLines = super.code
      .slice(0, this.openingScriptTagOffset)
      .split("\n");
    const offsetLinesCount = offsetCodeLines.length - 1;

    return Selection.fromPositions(
      super.selection.start.removeLines(offsetLinesCount),
      super.selection.end.removeLines(offsetLinesCount)
    );
  }

  private get openingScriptTagOffset(): Offset {
    return super.code.indexOf("<script>") + "<script>".length;
  }

  private get closingScriptTagOffset(): Offset {
    return super.code.indexOf("</script>");
  }

  // TODO: offset selection accordingly
  // async write(code: Code, newCursorPosition?: Position): Promise<void>

  // TODO: replace code in script tags when we write
  // async readThenWrite(
  //   selection: Selection,
  //   getModifications: (code: Code) => Modification[],
  //   newCursorPosition?: Position
  // ): Promise<void>

  // TODO: offset selection accordingly
  // moveCursorTo(position: Position)
}

type Offset = number;
