import html from "../Assets/svg/skills/html.svg";
import docker from "../Assets/svg/skills/docker.svg";
import css from "../Assets/svg/skills/css.svg";
import javascript from "../Assets/svg/skills/javascript.svg";
import nextJS from "../Assets/svg/skills/nextJS.svg";
import react from "../Assets/svg/skills/react.svg";
import typescript from "../Assets/svg/skills/typescript.svg";
import bootstrap from "../Assets/svg/skills/bootstrap.svg";
import mongoDB from "../Assets/svg/skills/mongoDB.svg";
import mysql from "../Assets/svg/skills/mysql.svg";
import postgresql from "../Assets/svg/skills/postgresql.svg";
import tailwind from "../Assets/svg/skills/tailwind.svg";
import vitejs from "../Assets/svg/skills/vitejs.svg";
import aws from "../Assets/svg/skills/aws.svg";
import ubuntu from "../Assets/svg/skills/ubuntu.svg";
import firebase from "../Assets/svg/skills/firebase.svg";
import git from "../Assets/svg/skills/git.svg";
import gitHub from "../Assets/svg/skills/github.svg";
import graphql from "../Assets/svg/skills/graphql.svg";
import materialui from "../Assets/svg/skills/materialui.svg";
import nodejs from "../Assets/svg/skills/nodejs.svg";
import express from "../Assets/svg/skills/express.svg";
import nginx from "../Assets/svg/skills/nginx.svg";
import stripe from "../Assets/svg/skills/stripe.svg";
import figma from "../Assets/svg/skills/figma.svg";
import markdown from "../Assets/svg/skills/markdown.svg";
import canva from "../Assets/svg/skills/canva.svg";
import python from "../Assets/svg/skills/python.svg";
import django from "../Assets/svg/skills/django.svg";
import flask from "../Assets/svg/skills/flask.svg";
import FastAPI from "../Assets/svg/skills/fastapi.svg";
import golang from "../Assets/svg/skills/golang.svg";

export const skillsImage = (skill) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case "html":
      return html;
    case "docker":
      return docker;
    case "css":
      return css;
    case "javascript":
      return javascript;
    case "next js":
      return nextJS;
    case "react":
      return react;
    case "typescript":
      return typescript;
    case "bootstrap":
      return bootstrap;
    case "mongodb":
      return mongoDB;
    case "mysql":
      return mysql;
    case "postgresql":
      return postgresql;
    case "tailwind":
      return tailwind;
    case "vitejs":
      return vitejs;
    case "aws":
      return aws;
    case "firebase":
      return firebase;
    case "git":
      return git;
    case "github":
      return gitHub;
    case "graphql":
      return graphql;
    case "materialui":
      return materialui;
    case "nginx":
      return nginx;
    case "stripe":
      return stripe;
    case "markdown":
      return markdown;
    case "microsoft office":
    case "figma":
      return figma;
    case "canva":
      return canva;
    case "nodejs":
      return nodejs;
    case "express":
      return express;
    case "ubuntu":
      return ubuntu;
    case "python":
      return python;
    case "django":
      return django;
    case "flask":
      return flask;
    case "fastapi":
      return FastAPI;
    case "golang":
      return golang;
    default:
      break;
  }
};
