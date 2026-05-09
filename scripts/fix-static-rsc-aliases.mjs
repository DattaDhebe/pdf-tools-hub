import { promises as fs } from 'node:fs';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'out');

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

async function createAliasesForNextDirectory(routeDir, nextDirName) {
  const sourceDir = path.join(routeDir, nextDirName);
  const sourceFiles = await collectFiles(sourceDir);
  let createdCount = 0;

  for (const sourceFile of sourceFiles) {
    if (!sourceFile.endsWith('.txt')) {
      continue;
    }

    const relativeParts = path.relative(sourceDir, sourceFile).split(path.sep);
    const aliasName = [nextDirName, ...relativeParts].join('.');
    const aliasPath = path.join(routeDir, aliasName);

    if (await pathExists(aliasPath)) {
      continue;
    }

    await fs.copyFile(sourceFile, aliasPath);
    createdCount += 1;
  }

  return createdCount;
}

async function createStaticRscAliases() {
  if (!await pathExists(outDir)) {
    console.log('[postbuild] Skipping static RSC aliases because `out` does not exist.');
    return;
  }

  const directoriesToVisit = [outDir];
  let createdCount = 0;

  while (directoriesToVisit.length > 0) {
    const currentDir = directoriesToVisit.pop();
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const fullPath = path.join(currentDir, entry.name);

      if (entry.name.startsWith('__next.')) {
        createdCount += await createAliasesForNextDirectory(currentDir, entry.name);
        continue;
      }

      directoriesToVisit.push(fullPath);
    }
  }

  console.log(`[postbuild] Created ${createdCount} static RSC alias file(s).`);
}

await createStaticRscAliases();
