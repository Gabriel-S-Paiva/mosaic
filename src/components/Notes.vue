<script setup lang="ts">
import {ref, computed} from 'vue';

const markdownInput = ref<string>('')

// Manual Markdown parser
const parseMarkdown = (markdown: string): string => {
    // Replace headers (#, ##, ###, etc.)
    markdown = markdown.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    markdown = markdown.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    markdown = markdown.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    markdown = markdown.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    markdown = markdown.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Replace bold (**text** or __text__)
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    markdown = markdown.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Replace italic (*text* or _text_)
    markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
    markdown = markdown.replace(/_(.*?)_/g, '<em>$1</em>');

    // Replace inline code (`code`)
    markdown = markdown.replace(/`(.*?)`/g, '<code>$1</code>');

    // Replace links ([text](url))
    markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Replace unordered lists (- or *)
    markdown = markdown.replace(/^\s*[-*] (.*$)/gim, '<li>$1</li>');
    markdown = markdown.replace(/(<li>.*<\/li>)(?!<\/ul>)/gim, '<ul>$1</ul>');

    // Replace ordered lists (1., 2., etc.)
    markdown = markdown.replace(/^\s*\d+\. (.*$)/gim, '<li>$1</li>');
    markdown = markdown.replace(/(<li>.*<\/li>)(?!<\/ol>)/gim, '<ol>$1</ol>');

    // Replace checkboxes ([ ] or [x])
    markdown = markdown.replace(/\[ \] (.*$)/gim, '<input type="checkbox" disabled> $1');
    markdown = markdown.replace(/\[x\] (.*$)/gim, '<input type="checkbox" disabled checked> $1');
    // Replace line breaks
    markdown = markdown.replace(/\n/g, '<br>');

    return markdown;
};

const parsedMarkdown = computed(()=> parseMarkdown(markdownInput.value)) 
</script>

<template>
    <div class="markdown-editor">
        <!-- Markdown Input Area -->
        <textarea
            v-model="markdownInput"
            class="w-full h-40 p-2 border rounded"
            placeholder="Type your Markdown here..."
        ></textarea>

        <!-- Rendered Markdown Output -->
        <div
            class="markdown-preview mt-4 p-2 border rounded bg-gray-100"
            v-html="parsedMarkdown"
        ></div>
    </div>
</template>