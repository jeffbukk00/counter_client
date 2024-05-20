import Action from "./Action";
import Problems from "./Problems";
import Solutions from "./Solutions";

const Container = () => {
  return (
    <main className="w-screen h-screen grid grid-cols-3">
      <Problems />
      <Solutions />
      <Action />
    </main>
  );
};

export default Container;
