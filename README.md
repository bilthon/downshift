## Downshift Store

[Live demo](https://serene-eagle-ayjv.here.now/)

### Summary

Basic demo web site built with React 19, showcasing a storefront.

Important design considerations:

- The pagination + filtering is performed locally, the order is: download -> transform -> filter -> sort -> paginate.
- The search is triggered after 300 ms of typing inactivity (debounced)
- The lack of CORS headers in the response was solved by using a small proxy in both dev and staging deployments


### Local development
```bash
npm install && npm run dev
```