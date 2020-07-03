yarn build

cd docs

echo 'poetry.toyou.xyz' > CNAME

git add -A
git commit -m 'Deploy'

git push origin master
