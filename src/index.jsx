import { createRoot } from 'react-dom/client';

//Import mainview component, which is the parent component, face of website
import { MainView } from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { Container } from "react-bootstrap";

// Main component (will eventually use all the others)
const MyMovieApplication = () => {
    return (
    <Container>
        <MainView />
    </Container>
    )
};

// Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<MyMovieApplication />);