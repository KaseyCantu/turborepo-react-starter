  # Storybook Basics
[Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)

This readme explains the basics of how to use storybook, and some general concepts and guidelines. Storybook is best utilized for component development with few or no side-effects. It does not do as well when large amounts of deeply-nested data needs to be provided, or when the component knows how to do many things rather than being passed in callbacks or handlers. A lot of functionailty can be added with either readily-available addons (ex: storybook-addon-next-router) or hand-rolled to be able to interact with component side-effects.

## Basic Concepts
### Story
A story is a rendered UI component in isolation from the rest of the application. The dev can set up arbitrary arguments for the components to utilize, and provide an arbitrary wrapper around the component for display reasons (a Decorator). It's possible to explicitly define multiple states of a component, like if you're trying to emulate specific input args, but _in general_ we want to allow the viewer to flip through options using Controls. An example of when you might set up multiple explicit stories are if you have multiple configurations that depend on a number of arguments.

### Controls
Storybook now uses Controls to allow the viewer to manipulate the args passed in to a component. In 4.x and earlier we had to explicitly mock out every arg we wanted to show a variant for. In 5.x Storybook introduced knobs, which allowed us to define UI controls for args rather than have to specify all the explicit cases. In Storybook 6.x we have controls, which are like knobs but automated based on PropTypes. Not all args work well with this, and there are a variety of options to manually set the controls available in the `argTypes` property.

### Actions
Callbacks normally do a thing. Storybook mocks out callbacks using the `action` import from `storybook-essentials`. Whenever that action is performed, it logs to the Storybook console that the action was performed instead of doing a side-effect or doing nothing. This obviates the need for mocking out logging behavior or demo behavior for any callbacks passed in as props.

### Decorators
Decorators in storybook are basically wrappers around the target story. This lets you manipulate data or the DOM around the target component. For example, I might add some padding around the target component just to make it easier to see so that it's not crammed against the edges of the canvas, or I might do a loose approximation of what kind of UI the component will be in so that any effects on that UI might be seen (screen blur, overlay, etc)

## Less-basic Concepts
### main.js
Storybook uses Webpack under the hood to transpile all the code and run HMR. `main.js` is the base webpack config, and that can be further modified by adding presets. In our case, we've added a preset that emulates the `NextJS` webpack config. Storybook runs webpack independently from the project, so we can customize the webpack any which way without affecting the rest of the project.

### preview.js
Preview lets us add decorators, parameters, and generally modify how the stories are arranged or interacted with at a global level. For example, we've added a decorator to _all_ stories for next-router that lets us see router actions without needing to add those parameters to each individual story where we want to see router actions. You can see that we also alphabetically sort all the stories, and we've set the expanded view of the controls to be `true` globally as well.

## Simple Story Process
0. Stories should be created next to the components they're for. They will be named `component-name.stories.tsx`
1. Because we use typescript, `import { Story, Meta } from '@storybook/react/types-6-0';` will be necessary to automatically determine the proptypes for our components.
2. Import the **NAMED EXPORT** of the component and its Type from the component in question: `import { BackButton, Props } from './index';`. Importing the default does **NOT** work with TypeScript like it does for normal JS.
3. Create a Template to render the component within a story and pass it any args that would become props. We use the template later to create multiple variants of the component, each of which becomes a story. This is not strictly necessary, but it is an easy pattern to follow.
4. Export the default configuration for the stories generated by this file. This will include the section title, the component being rendered, any argType configuration, any decorators for the story. Since we use TS, we export this `as Meta` so that props are recognized appropriately.
5. Export named stories using the template. By binding the template to a new variable, we can create multiple named stories and set the initial arg values for those stories. The args provided to these templates are what get passed in as the initial props.

```javascript
export const BackButtonStory = Template.bind({});
BackButtonStory.args = {
  route: undefined,
};
```