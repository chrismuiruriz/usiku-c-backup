import { render } from "@testing-library/vue";
import HelloWorld from "@/components/HelloWorld";

describe("HelloWorld.vue", () => {
  it("renders props.jina when passed", () => {
    const jina = "tester";

    const { findByText } = render(HelloWorld, {
      propsData: { jina },
    });

    findByText("Hello tester from my Vue.js page, built with Webpack 4!");
  });
});
