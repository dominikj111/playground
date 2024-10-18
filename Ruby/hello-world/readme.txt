docker build . -t ruby_3_3_container

docker run -v "$PWD:/usr/src/app" --interactive --tty --rm ruby_3_3_container

---

bundle install

rake
rake run
