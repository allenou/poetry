npm run build

cd docs

echo 'poetry.toyou.xyz' > CNAME

git add .
git commit -m 'Deploy'

# git push origin next