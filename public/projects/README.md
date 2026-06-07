# Updating Portfolio Samples

1. Add your image or video files to this folder.
2. Open `src/data/projects.js`.
3. Update a sample's `title`, `image`, `gallery`, `description`, `role`, and `tags`.
4. Use an image path like `/projects/my-new-sample.png`.
5. Add more full-view carousel items by putting more paths inside `gallery`.

Example:

```js
gallery: [
  "/projects/my-new-sample.png",
  "/projects/my-second-sample.png",
  "/projects/my-animation.mp4",
],
```

Keep `image` as the thumbnail preview. Use `gallery` for the full-view image
or video carousel.

The first nine items appear in the homepage bento gallery. The **View more
samples** button currently opens the external Figma archive.
