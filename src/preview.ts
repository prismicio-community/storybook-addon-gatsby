// Needed to declare types in the `global` namespace. This identifies the file
// as a module.
export {};

declare global {
	// eslint-disable-next-line no-var
	var ___loader: {
		enqueue: () => void;
		hovering: () => void;
	};
	// eslint-disable-next-line no-var
	var __PATH_PREFIX__: string;
	// eslint-disable-next-line no-var
	var __BASE_PATH__: string;
	// eslint-disable-next-line no-var
	var ___navigate: (pathname: string) => void;
}

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from
// creating console errors you override it here
window.___loader = {
	enqueue: () => {
		// noop
	},
	hovering: () => {
		// noop
	},
};

// Gatsby internal mocking to prevent unnecessary errors in Storybook testing
// environment
window.__PATH_PREFIX__ = "";
window.__BASE_PATH__ = "";

// This is to utilized to override the window.___navigate method Gatsby defines
// and uses to report what path a Link would be taking us to if it wasn't
// inside a storybook
window.___navigate = (pathname) => {
	console.info("Navigate to: ", pathname);
};
