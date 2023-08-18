.PHONY: extension

extension:
	rm -rf dist/apps/extension/chrome
	yarn nx build extension
	mv dist/apps/extension/.next/_next dist/apps/extension/.next/next
	mv dist/apps/extension/.next dist/apps/extension/chrome
	grep -rli '_next' dist/apps/extension/chrome/* | xargs -I@ sed -i '' 's|/_next|/next|g' @;
