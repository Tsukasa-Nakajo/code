import {render, screen} from"@testing-library/react";
import useEvent from "@testing-library/user-event";
import {SimpleButton} from "./SimpleButton";

test("ボタンをクリックするとON／OFFの表示が切り替わる",async () =>{
    const user = useEvent.setup();
    render(<SimpleButton />);
    const simpleButton = screen.getByRole("button");
    expect(simpleButton).toHaveTextContent("OFF");
    await user.click(simpleButton);
    expect(simpleButton).toHaveTextContent("ON");
});

test("描画されてすぐはOFFと表示されている", () => {
    const view = render(<SimpleButton />);
    expect(view.container).toMatchSnapshot();
});